export type IJumlahAlumni = {
  id: number;
  laki_laki: number;
  perempuan: number;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateJumlahAlumniType = {
  laki_laki: string;
  perempuan: string;
};

export type UpdateJumlahAlumniType = {
  id: number;
  laki_laki?: string;
  perempuan?: string;
};

// Response – dikirim ke FE
export type ResponseJumlahAlumniType = {
  id: number;
  laki_laki: number;
  perempuan: number;
  createdAt: Date;
  updatedAt: Date;
};
