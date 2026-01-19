// MongoDB / Mongoose style
export type IPamflet = {
  id: number;
  pamflet: File;
  createdAt: string;
  updatedAt: string;
};

// Create – tanpa id, dibuat otomatis
export type CreatePamfletType = {
  pamflet: File;
};

// Update – id wajib, pamflet optional
export type UpdatePamfletType = {
  id: number;
  pamflet?: File;
};

// Response – dikirim ke FE
export type ResponsePamfletType = {
  id: number;
  pamflet: string;
  createdAt: string;
  updatedAt: string;
};
