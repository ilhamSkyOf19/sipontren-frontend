export type IPendaftaran = {
  id: number;
  dari: Date;
  sampai: Date;
  aktif: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type CreatePendaftaranType = {
  dari: string;
  sampai: string;
};

export type UpdatePendaftaranType = Partial<CreatePendaftaranType>;

// Response – dikirim ke FE
export type ResponsePendaftaranType = IPendaftaran;
