import React from 'react';
import { Table, Progress, Anchor, Text, Group, Container, Title, Paper } from '@mantine/core';
import { aggregateData } from '../data/processData';
import styles from './DataTable.module.css';

const DataTable: React.FC = () => {
  const { yearlyAggregation, cropAggregation } = aggregateData();

  const yearlyRows = yearlyAggregation.map((row, index) => (
    <tr key={index}>
      <td className={styles.columnYear}>{row.year.split(",")[1]}</td>
      <td className={styles.columnTitle}>
        <Anchor component="button">{row.maxProductionCrop}</Anchor>
      </td>
      <td className={styles.columnTitle}>
        <Anchor component="button">{row.minProductionCrop}</Anchor>
      </td>
    </tr>
  ));

  const cropRows = cropAggregation.map((row, index) => {
    const avgYield = row.avgYield.toFixed(2);
    const avgCultivationArea = row.avgCultivationArea.toFixed(3);
    const total = parseFloat(avgYield) + parseFloat(avgCultivationArea);
    const yieldPercentage = (parseFloat(avgYield) / total) * 100;
    const areaPercentage = (parseFloat(avgCultivationArea) / total) * 100;

    return (
      <tr key={index}>
        <td>
          <Anchor component="button">{row.crop}</Anchor>
        </td>
        <td>{avgYield}</td>
        <td>{avgCultivationArea}</td>
        <td>
          <Group>
            <Text size="xs" color="teal">
              {yieldPercentage.toFixed(0)}%
            </Text>
            <Text size="xs" color="red" >
              {areaPercentage.toFixed(0)}%
            </Text>
          </Group>
          <Progress size="xl" radius="sm" value={yieldPercentage}>
            <Progress.Section
              value={yieldPercentage}
              color="teal"
            />
            <Progress.Section
              value={areaPercentage}
              color="red"
            />
          </Progress>
        </td>
      </tr>
    );
  });

  return (
    <Container ml="lg">
    <Paper shadow="sm" mb="lg">
        <Title order={2} style={{marginBottom:"20px"}}>Yearly Aggregation (1950-2020)</Title>
        <Table striped highlightOnHover>
          <thead>
            <tr>
              <th align="left">Year</th>
              <th align="left">Crop with Maximum Production</th>
              <th align="left">Crop with Minimum Production</th>
            </tr>
          </thead>
          <tbody>{yearlyRows}</tbody>
        </Table>
      </Paper>

      <Paper shadow="sm">
        <Title order={2} style={{marginBottom:"20px"}}>Crop Aggregation (1950-2020)</Title>
        <Table striped highlightOnHover>
          <thead>
            <tr>
              <th>Crop</th>
              <th>Average Yield (Kg/Ha)</th>
              <th>Average Cultivation Area (Ha)</th>
              <th>Reviews distribution</th>
            </tr>
          </thead>
          <tbody>{cropRows}</tbody>
        </Table>
      </Paper>
    </Container>
  );
};

export default DataTable;
