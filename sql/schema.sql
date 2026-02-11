CREATE DATABASE IF NOT EXISTS recycling_db;
USE recycling_db;

-- =============================
-- Candidates Table
-- =============================

CREATE TABLE candidates (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    years_experience TINYINT UNSIGNED NOT NULL,
    status ENUM('Pending', 'Evaluated') DEFAULT 'Pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =============================
-- Skills Table (Normalized)
-- =============================

CREATE TABLE skills (
    skill_id INT AUTO_INCREMENT PRIMARY KEY,
    skill_name VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE candidate_skills (
    candidate_id INT,
    skill_id INT,
    PRIMARY KEY (candidate_id, skill_id),
    FOREIGN KEY (candidate_id) REFERENCES candidates(id) ON DELETE CASCADE,
    FOREIGN KEY (skill_id) REFERENCES skills(skill_id) ON DELETE CASCADE
);

-- =============================
-- Evaluations Table
-- =============================

CREATE TABLE evaluations (
    evaluation_id INT AUTO_INCREMENT PRIMARY KEY,
    candidate_id INT NOT NULL,
    crisis_management_score TINYINT UNSIGNED NOT NULL,
    sustainability_score TINYINT UNSIGNED NOT NULL,
    team_motivation_score TINYINT UNSIGNED NOT NULL,

    total_score INT GENERATED ALWAYS AS (
        crisis_management_score +
        sustainability_score +
        team_motivation_score
    ) STORED,

    FOREIGN KEY (candidate_id) REFERENCES candidates(id) ON DELETE CASCADE,
    UNIQUE (candidate_id)
);

-- =============================
-- Rankings Table
-- =============================

CREATE TABLE rankings (
    candidate_id INT PRIMARY KEY,
    total_score INT NOT NULL,
    rank_position INT NOT NULL,
    FOREIGN KEY (candidate_id) REFERENCES candidates(id) ON DELETE CASCADE
);

-- =============================
-- Indexes
-- =============================

CREATE INDEX idx_eval_candidate ON evaluations(candidate_id);
CREATE INDEX idx_rank_score ON rankings(total_score);

==============

DELIMITER $$

CREATE TRIGGER update_rankings
AFTER INSERT ON evaluations
FOR EACH ROW
BEGIN
    DELETE FROM rankings;

    INSERT INTO rankings (candidate_id, total_score, rank_position)
    SELECT 
        e.candidate_id,
        e.total_score,
        RANK() OVER (ORDER BY e.total_score DESC) AS rank_position
    FROM evaluations e;
END $$

DELIMITER ;
