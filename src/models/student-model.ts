// Student Interface (MongoDB)
export type IStudent = {
  id: number;
  jenis_sekolah: "SD" | "SMP" | "SMA";
  nisn: string;
  nik: string;
  nama_lengkap: string;
  jenis_kelamin: "laki_laki" | "perempuan";
  usia: string;
  tempat_lahir: string;
  tanggal_lahir: string;
  alamat: string;
  no_telepon: string;
  anak_ke: string;
  jumlah_saudara: string;
  asal_sekolah: string;
  alamat_sekolah_asal: string;
  nama_lengkap_ayah: string;
  nama_lengkap_ibu: string;
  nama_lengkap_wali?: string;

  // files
  foto_formal: File;
  fc_akta_kelahiran: File;
  foto_kk: File;
  fc_ktp: File;
  fc_kis_kip: File;

  // timestamps
  createdAt: Date; // ISO string dari mongoose timestamps
  updatedAt: Date;
};

// Create student type
export type CreateStudentType = Omit<
  IStudent,
  "id" | "createdAt" | "updatedAt"
>;

// Update student type
export type UpdateStudentType = Partial<
  Omit<IStudent, "id" | "createdAt" | "updatedAt">
>;

// Response type
export type ResponseStudentType = Omit<
  IStudent,
  | "tanggal_lahir"
  | "foto_formal"
  | "fc_akta_kelahiran"
  | "foto_kk"
  | "fc_ktp"
  | "fc_kis_kip"
  | "usia"
  | "nik"
  | "nisn"
  | "anak_ke"
  | "jumlah_saudara"
> & {
  usia: number;
  nik: number;
  nisn: number;
  jumlah_saudara: number;
  anak_ke: number;
  tanggal_lahir: Date;
  foto_formal: string;
  fc_akta_kelahiran: string;
  foto_kk: string;
  fc_ktp: string;
  fc_kis_kip: string;
};

export type ResponseStudentWithMetaType = {
  data: ResponseStudentType[];
  meta: {
    currentPage: number;
    totalPage: number;
    totalData: number;
    pageSize: number;
  };
};

export type FileStudent = {
  foto_formal: string;
  fc_akta_kelahiran: string;
  foto_kk: string;
  fc_ktp: string;
  fc_kis_kip: string;
};
