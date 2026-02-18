declare module "jstat" {
  const jStat: {
    studentt: {
      cdf(x: number, df: number): number;
      inv(p: number, df: number): number;
      pdf(x: number, df: number): number;
    };
    chisquare: {
      cdf(x: number, df: number): number;
      inv(p: number, df: number): number;
      pdf(x: number, df: number): number;
    };
    centralF: {
      cdf(x: number, df1: number, df2: number): number;
      inv(p: number, df1: number, df2: number): number;
    };
    normal: {
      cdf(x: number, mean: number, sd: number): number;
      inv(p: number, mean: number, sd: number): number;
    };
    binomial: {
      cdf(k: number, n: number, p: number): number;
      pdf(k: number, n: number, p: number): number;
    };
    corrcoeff(arr1: number[], arr2: number[]): number;
    spearmancoeff(arr1: number[], arr2: number[]): number;
  };
  export default jStat;
}
