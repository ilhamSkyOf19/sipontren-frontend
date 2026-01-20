import type { FC } from "react";
import logo from "../../assets/icons/file_thumb.webp";
import BoxInputText from "../../components/BoxInputText";
import ButtonSubmit from "../../components/ButtonSubmit";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import type { LoginType } from "../../models/user-model";
import { AuthService } from "../../services/auth.service";
import { UserValidation } from "../../validations/user-validation";
import BoxInputPassword from "../../components/BoxInputPassword";
import ParallaxLoginPage from "../../fragments/ParallaxLoginPage";

const LoginPage: FC = () => {
  // navigate
  const navigate = useNavigate();

  // use form
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginType>({
    resolver: zodResolver(UserValidation.LOGIN),
  });

  // use mutation
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data: LoginType) => AuthService.login(data),
    onSuccess: (data) => {
      console.log(data);

      // navigate
      navigate("/dashboard", {
        state: {
          success: true,
          message: "berhasil login",
        },
      });
    },
    onError: (error) => {
      // cek error axios
      if (error instanceof AxiosError) {
        if (error.status === 400) {
          // set error
          setError("email", { message: "email atau password salah" });
          setError("password", { message: "email atau password salah" });
        }
      }
    },
  });

  // handle submit
  const onSubmit = async (data: LoginType) => {
    try {
      console.log(data);

      await mutateAsync(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="w-screen h-screen flex flex-row justify-start items-center lg:px-12 px-4">
      {/* label */}
      <ParallaxLoginPage
        left={true}
        customClass="flex-1 h-full hidden flex-col justify-center items-center lg:flex"
      >
        {/* icon */}
        <div className="w-70 h-70 overflow-hidden">
          <img
            src={logo}
            alt="logo polisi"
            className="w-full h-full object-contain"
            loading="lazy"
          />
        </div>

        {/* title */}
        <h2 className="text-4xl font-bold text-secondary-blue mt-4 relative pb-4">
          SIPONTREN
        </h2>

        {/* line */}
        <div className="w-[80%] my-2 h-px bg-secondary-blue/50" />

        {/* brand */}
        <div className="w-full flex flex-col mt-2 justify-start items-center gap-1">
          <p className="text-xl font-medium text-primary-black/80">
            Sistem Informasi Pondok Pesantren
          </p>
          <p className="text-xl font-medium text-primary-black/80">
            Muhammadiyah Al-Amin Seputih Banyak
          </p>
        </div>
      </ParallaxLoginPage>

      {/* input */}
      <div className="w-full lg:flex-1 h-full flex flex-col justify-center items-center">
        <ParallaxLoginPage
          right={true}
          customClass="w-full flex flex-row justify-center items-center"
        >
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full px-6 py-10 lg:w-[70%] lg:h-[70vh] flex flex-col justify-start items-center lg:px-12 lg:pt-20 pb-12 bg-white shadow-[0_2px_10px_2px_rgba(0,0,0,0.05)] rounded-2xl"
          >
            {/* title */}
            <div className="w-full flex flex-col justify-start items-start mb-4">
              <h2 className="lg:text-xl font-semibold">Selamat Datang,</h2>
              <p className="text-sm lg:text-base">
                Masuk ke akun Anda untuk melanjutkan.
              </p>
            </div>

            <div className="w-full flex flex-col justify-start items-start">
              {/* email */}
              <BoxInputText
                max={50}
                label="Email"
                name="email"
                placeholder="Masukan email ..."
                register={register("email")}
                errorMessage={errors.email?.message}
              />

              {/* password */}
              <BoxInputPassword
                label="Password"
                name="password"
                placeholder="Masukan password ..."
                register={register("password")}
                errorMessage={errors.password?.message}
              />
            </div>

            {/* button submit */}
            <div className="w-full mt-6">
              <ButtonSubmit label="MASUK" loading={isPending} />
            </div>
          </form>
        </ParallaxLoginPage>

        {/* footer */}
        <footer className="w-full flex flex-col justify-start items-center mt-6 lg:hidden">
          <ParallaxLoginPage fadeIn={true}>
            {/* icon */}
            <div className="w-full flex flex-col justify-start items-center relative after:content-[''] after:w-26 after:h-0.5 after:rounded-full after:bg-primary-yellow after:absolute  after:left-1/4 after:top-1/2 after:-translate-x-1/2 before:content-[''] before:w-26 before:h-0.5 before:rounded-full before:bg-primary-yellow before:absolute  before:right-1/4 before:top-1/2 before:translate-x-1/2">
              {/* icon */}
              <img src={logo} alt="logo" className="w-12 h-12" />
            </div>

            {/* label */}
            <div className="w-full flex flex-col justify-start items-center">
              {/* title */}
              <h3 className="text-md text-primary-black font-semibold">
                SIPONTREN
              </h3>
              <p className="text-xs text-primary-black">
                Sistem Informasi Pondok Pesantren
              </p>
              <p className="text-xs text-primary-black">
                Muhammadiyah Al-Amin Seputih Banyak
              </p>
            </div>
          </ParallaxLoginPage>
        </footer>
      </div>
    </main>
  );
};

export default LoginPage;
