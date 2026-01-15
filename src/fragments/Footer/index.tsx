import TextLink from "../../components/TextLink";
import { FaFacebookF, FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa";
import IconArab from "../../components/IconArab";
import type { FC } from "react";

// Props
type FooterProps = {
  widthDevice: number;
};
const Footer: FC<FooterProps> = ({ widthDevice }) => {
  return (
    <div className="w-screen min-h-[70vh] flex flex-col justify-start items-start bg-primary-blue pt-8 px-4 gap-6 pb-7 md:min-h-screen lg:min-h-[40vh] lg:px-14 lg:pb-4 lg:pt-9">
      <div className="w-full flex flex-col justify-start items-start gap-6 lg:flex-row lg:justify-between">
        <div className="w-full flex flex-col justify-start items-start gap-6 lg:flex-1">
          <IconArab
            width={
              widthDevice > 0 && widthDevice <= 760
                ? 100
                : widthDevice > 760 && widthDevice < 1024
                ? 100
                : widthDevice > 1024
                ? 140
                : 100
            }
          />
          <div className="flex flex-col gap-2">
            <p className="text-sm text-primary-yellow md:text-2xl lg:text-sm">
              Alamat
            </p>
            <a
              href="https://maps.app.goo.gl/QvT4tcbTzG6kppcq7"
              target="_blank"
              className="text-sm text-white font-extralight md:text-xl lg:text-sm lg:cursor-pointer lg:font-normal"
            >
              Jl. AR. Fakhrudin No.22 Desa Tanjung Harapan, Kecematan Seputih
              Banyak, Kabupaten Lampung Tengah 34156
            </a>
          </div>
          {widthDevice < 1024 && (
            <div className="flex flex-col gap-7 mb-4">
              <PusatBantuan
                title={"Bantuan"}
                link={["faq", "", "", ""]}
                text={["FAQ", "Hubungi Kami", "+62 822-7821-9515"]}
              />
              <PusatBantuan
                title={"Layanan Kami"}
                link={["", "", "", ""]}
                text={[
                  "Profil Pesantren",
                  "Penerimaan Santri Baru",
                  "Berita Terkini",
                ]}
              />
              <PusatBantuan
                title={"Informasi Penting"}
                link={["", "", "", ""]}
                text={["Jam Kerja", "Biaya Pendidikan", "Pendaftaran"]}
              />
            </div>
          )}

          {/* media social */}
          <div className="w-full flex flex-row justify-start items-center gap-3 lg:mb-1">
            <MediaSocialComponent
              link={"https://www.facebook.com/profile.php?id=100011218575737"}
            >
              <FaFacebookF className="text-primary-blue text-xl md:text-3xl lg:text-lg" />
            </MediaSocialComponent>
            <MediaSocialComponent
              link={
                "https://www.instagram.com/alaminseputihbanyak?igsh=MzJwbnI5bDJmMDVq"
              }
            >
              <FaInstagram className="text-primary-blue text-xl md:text-3xl lg:text-lg" />
            </MediaSocialComponent>
            <MediaSocialComponent
              link={
                "https://www.tiktok.com/@pontrenmu.alamin?_t=ZS-8wjeNqqt9wF&_r=1"
              }
            >
              <FaTiktok className="text-primary-blue text-xl md:text-3xl lg:text-lg" />
            </MediaSocialComponent>
            <MediaSocialComponent
              link={"https://www.youtube.com/@alaminseputihbanyak"}
            >
              <FaYoutube className="text-primary-blue text-xl md:text-3xl lg:text-lg" />
            </MediaSocialComponent>
          </div>
        </div>
        {widthDevice > 1024 && (
          <div className="flex flex-col gap-7 mb-4 lg:flex-1 lg:flex-row lg:justify-end">
            <PusatBantuan
              title={"Bantuan"}
              link={["faq", "", "", ""]}
              text={["FAQ", "Hubungi Kami", "+62 822-7821-9515"]}
            />
            <PusatBantuan
              title={"Layanan Kami"}
              link={["", "", "", ""]}
              text={[
                "Profil Pesantren",
                "Penerimaan Santri Baru",
                "Berita Terkini",
              ]}
            />
            <PusatBantuan
              title={"Informasi Penting"}
              link={["", "", "", ""]}
              text={["Jam Kerja", "Biaya Pendidikan", "Pendaftaran"]}
            />
          </div>
        )}
      </div>

      <div className="w-full flex flex-col justify-center items-start lg:flex-row lg:justify-between">
        <p className="text-sm text-white font-extralight md:text-lg lg:text-sm">
          &copy; 2024 Sipontren Inc. Copyright and all rights reserved
        </p>
        <div className="flex flex-col justify-start items-start gap-0 lg:flex-row lg:gap-5">
          <p className="text-sm text-white font-extralight md:text-lg lg:text-sm">
            Terms and Conditions
          </p>
          {widthDevice > 1024 && (
            <p className="text-sm text-white font-bold">&middot;</p>
          )}
          <p className="text-sm text-white font-extralight md:text-lg lg:text-sm">
            Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
};

// pusat bantuan
type PusatBantuanProps = {
  title: string;
  link: string[];
  text: string[];
};

const PusatBantuan: FC<PusatBantuanProps> = ({ title, link, text }) => {
  return (
    <div className="flex flex-col gap-2 lg:gap-4">
      <p className="text-sm font-light text-primary-yellow mb-2 md:text-2xl lg:text-sm lg:font-normal">
        {title}
      </p>
      {link.map((item, index) => {
        return (
          <TextLink key={index} link={item} text={text[index]} active={true} />
        );
      })}
    </div>
  );
};

// =================
// Media social component
// =================

type MediaSocialComponentProps = {
  link: string;
  children: React.ReactNode;
};

const MediaSocialComponent: FC<MediaSocialComponentProps> = ({
  link,
  children,
}) => {
  return (
    <a
      href={link}
      target="_blank"
      rel="noreferrer noopener"
      className="w-[2.2rem] h-[2.2rem] bg-white rounded-full flex justify-center items-center 
             md:w-16 md:h-16 lg:w-8 lg:h-8 
             transform lg:hover:scale-120 transition duration-300 ease-in-out will-change-transform"
    >
      {children}
    </a>
  );
};

export default Footer;
