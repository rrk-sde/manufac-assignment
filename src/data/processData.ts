import agroData from './agroData.json';

export interface AgricultureData {
  [key: string]: number | string;
}

interface YearlyAggregation {
  year: string;
  maxProductionCrop: string;
  minProductionCrop: string;
}

interface CropAggregation {
  crop: string;
  avgYield: number;
  avgCultivationArea: number;
}

export const aggregateData = () => {
  const yearlyData: { [year: string]: any[] } = {};
  const cropData: { [crop: string]: { yieldSum: number, areaSum: number, count: number } } = {};

  agroData.forEach((entry: any) => {
    const year = entry['Year'];
    const crop = entry['Crop Name'];
    const production = Number(entry['Crop Production (UOM:t(Tonnes))'] || 0);
    const yieldCrop = Number(entry['Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))'] || 0);
    const area = Number(entry['Area Under Cultivation (UOM:Ha(Hectares))'] || 0);


    if (!yearlyData[year]) {
      yearlyData[year] = [];
    }
    yearlyData[year].push({ crop, production });


    if (!cropData[crop]) {
      cropData[crop] = { yieldSum: 0, areaSum: 0, count: 0 };
    }
    cropData[crop].yieldSum += yieldCrop;
    cropData[crop].areaSum += area;
    cropData[crop].count += 1;
  });

  const yearlyAggregation: YearlyAggregation[] = Object.entries(yearlyData).map(([year, crops]) => {
    const maxProductionCrop = crops.reduce((max, crop) => crop.production > max.production ? crop : max, crops[0]);
    const minProductionCrop = crops.reduce((min, crop) => crop.production < min.production ? crop : min, crops[0]);
    return {
      year,
      maxProductionCrop: maxProductionCrop.crop,
      minProductionCrop: minProductionCrop.crop,
    };
  });

  const cropAggregation: CropAggregation[] = Object.entries(cropData).map(([crop, data]) => ({
    crop,
    avgYield: data.yieldSum / data.count,
    avgCultivationArea: data.areaSum / data.count,
  }));

  return { yearlyAggregation, cropAggregation };
};
