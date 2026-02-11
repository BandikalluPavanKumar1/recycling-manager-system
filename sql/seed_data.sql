USE recycling_db;

-- =============================
-- Insert Skills
-- =============================

INSERT INTO skills (skill_name) VALUES
('Waste Sorting'),
('OSHA Safety'),
('ISO 14001'),
('Lean Six Sigma'),
('Logistics'),
('Team Leadership');

-- =============================
-- Insert Candidates
-- =============================

INSERT INTO candidates (name, years_experience, status) VALUES
('Liam Smith', 12, 'Evaluated'),
('Noah Johnson', 7, 'Evaluated');

-- =============================
-- Map Candidate Skills
-- =============================

-- Liam Smith (id = 1)
INSERT INTO candidate_skills (candidate_id, skill_id) VALUES
(1, 1),  -- Waste Sorting
(1, 2),  -- OSHA Safety
(1, 3);  -- ISO 14001

-- Noah Johnson (id = 2)
INSERT INTO candidate_skills (candidate_id, skill_id) VALUES
(2, 4),  -- Lean Six Sigma
(2, 5),  -- Logistics
(2, 6);  -- Team Leadership

-- =============================
-- Insert Evaluations
-- =============================

INSERT INTO evaluations
(candidate_id, crisis_management_score, sustainability_score, team_motivation_score)
VALUES
(1, 85, 90, 88),
(2, 72, 68, 75);

-- =============================
-- Populate Rankings (Initial)
-- =============================

INSERT INTO rankings (candidate_id, total_score, rank_position)
SELECT 
    e.candidate_id,
    e.total_score,
    RANK() OVER (ORDER BY e.total_score DESC) AS rank_position
FROM evaluations e;
