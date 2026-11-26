export interface ProgramPackageDto {
  code: string;
  name: string;
  price: number;
  weight_min: number;
  weight_max: number;
}

export interface ProgramDto {
  program: {
    year: number;
    default_tenor: number;
    max_tenor: number;
    rounding: number;
    registration_open: boolean;
    registration_deadline: string;
    idul_adha_date: string;
    idul_adha_is_estimate: boolean;
    payoff_deadline: string;
    last_installment_month: string;
    packages: ProgramPackageDto[];
  };
}
