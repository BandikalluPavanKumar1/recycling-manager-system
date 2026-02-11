import React, { useMemo } from 'react';
import {
  Container,
  Title,
  Grid,
  Card,
  Text,
  Badge,
  Group,
  Table,
  Button,
  ScrollArea,
  Avatar,
  Paper
} from '@mantine/core';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from 'recharts';

import { generateCandidates } from './data/candidates';
import classes from './Dashboard.module.css';
import { IconShare, IconTrophy, IconChartBar, IconRecycle } from '@tabler/icons-react';

export default function App() {

  const rankedCandidates = useMemo(() => generateCandidates(), []);

  const topTen = rankedCandidates.slice(0, 10);
  const topFive = rankedCandidates.slice(0, 5);

  const handleShare = (name) => {
    alert(`${name}'s profile sent to HR successfully.`);
  };

  return (
    <div className={classes.dashboardContainer}>
      <Container size="xl">

        <Group justify="space-between" mb="xl">
          <div>
            <Group gap="xs">
  <IconRecycle size={32} color="green" />
  <Title order={1} c="blue.9">
    G CP Production Manager
  </Title>
</Group>

            <Text c="dimmed">
              Recycling Production Line Manager Selection System
            </Text>
          </div>

          <Badge size="xl" variant="filled" color="green">
            {rankedCandidates.length} Profiles Loaded
          </Badge>
        </Group>

        <Grid gutter="md">

          {/* Leaderboard */}
          <Grid.Col span={{ base: 12, md: 7 }}>
            <Paper shadow="xs" p="md" withBorder>
              <Title order={3} mb="md">Top 10 Rankings</Title>

              <ScrollArea h={400}>
                <Table striped highlightOnHover>
                  <Table.Thead>
                    <Table.Tr>
                      <Table.Th>Rank</Table.Th>
                      <Table.Th>Candidate</Table.Th>
                      <Table.Th>Experience</Table.Th>
                      <Table.Th>Total Score</Table.Th>
                    </Table.Tr>
                  </Table.Thead>

                  <Table.Tbody>
                    {topTen.map((c, i) => (
                      <Table.Tr key={c.id}>
                        <Table.Td>#{c.rankPosition}</Table.Td>
                        <Table.Td>{c.name}</Table.Td>
                        <Table.Td>{c.experience} yrs</Table.Td>
                        <Table.Td>
                          <Badge variant="light">
                            {c.totalScore}
                          </Badge>
                        </Table.Td>
                      </Table.Tr>
                    ))}
                  </Table.Tbody>
                </Table>
              </ScrollArea>
            </Paper>
          </Grid.Col>

          {/* Chart */}
          <Grid.Col span={{ base: 12, md: 5 }}>
            <Paper shadow="xs" p="md" withBorder>
              <Title order={3} mb="md">
                Evaluation Scores (Top 5)
              </Title>

              <div style={{ height: 350 }}>
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={topFive} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" hide />
                    <YAxis dataKey="name" type="category" width={120} />
                    <Tooltip />
                    <Bar dataKey="crisisScore" fill="#fa5252" />
                    <Bar dataKey="sustainabilityScore" fill="#40c057" />
                    <Bar dataKey="motivationScore" fill="#228be6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Paper>
          </Grid.Col>

          {/* Cards */}
          <Grid.Col span={12}>
            <Title order={2} mt="xl" mb="md">
              Candidate Portfolio
            </Title>

            <Grid>
              {rankedCandidates.slice(0, 12).map((c) => (
                <Grid.Col span={{ base: 12, sm: 6, lg: 3 }} key={c.id}>
                  <Card shadow="sm" p="lg" radius="md" withBorder>
                    <Group justify="space-between" mb="xs">
                      <Avatar color="blue" radius="xl">
                        {c.name.split(' ').map(n => n[0]).join('')}
                      </Avatar>
                      <Badge variant="outline">
                        {c.experience} yrs
                      </Badge>
                    </Group>

                    <Text fw={500}>{c.name}</Text>

                    <Text size="xs" c="dimmed" mb="md">
                      Skills: {c.skills.join(' • ')}
                    </Text>

                    <Button
                      variant="light"
                      fullWidth
                      onClick={() => handleShare(c.name)}
                    >
                      Share Profile
                    </Button>
                  </Card>
                </Grid.Col>
              ))}
            </Grid>

          </Grid.Col>
        </Grid>
      </Container>
    </div>
  );
}
