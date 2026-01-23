export type ImageKey =
  | "bg1"
  | "bg2"
  | "bg3"
  | "bg4"
  | "bg5"
  | "bg6"
  | "bgKokam"
  | "bgPaskibra";

export type PersonKey =
  | "person1"
  | "person2"
  | "person3"
  | "person4"
  | "person5"
  | "person6"
  | "personKokam"
  | "personPaskibra";

export type LogoKey = "logo1" | "logo2" | "logo3";

// response
export type ResponseData<T> =
  | {
      success: true;
      message: string;
      data: T;
    }
  | {
      success: false;
      message: string;
    };

// response message
export type ResponseMessage = {
  success: boolean;
  message: string;
};

// filter data
export type FilterData = {
  from?: string;
  to?: string;
  search?: string;
  page?: string;
  jenis_kelamin?: "laki_laki" | "perempuan";
  jenis_sekolah?: "SD" | "SMP" | "SMA";
};
