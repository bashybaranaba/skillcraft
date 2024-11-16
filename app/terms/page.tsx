import React from "react";

export default function TermsOfService() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="p-6 w-full my-4 max-w-xl bg-white shadow-md rounded-md">
        {/* Estonian Terms of Service */}
        <h1 className="text-lg text-center font-bold mb-6">Üldtingimused</h1>

        <p className="text-base text-gray-500 mb-4">
          {`Need üldtingimused reguleerivad teie Skill-craft platvormi ja teenuste,
          sealhulgas vestlusrobotite ja API, kasutamist. Teenuseid kasutades
          nõustute järgnevate tingimustega:`}
        </p>

        <ul className="text-base text-gray-500 list-decimal list-inside space-y-4">
          <li>
            {`Kasutaja vastutus`}
            <br />
            {`Te vastutate oma esitatud teabe õigsuse eest ja kõigi oma kontol
            toimuvate tegevuste eest. Kasutamine peab olema seaduslik.`}
          </li>
          <li>
            {`Lubatud kasutamine`}
            <br />
            {`Meie teenuseid tohib kasutada ainult seaduslikult. Kuritarvitamine,
            rämpspostitamine ja ebaeetilised tegevused on keelatud.`}
          </li>
          <li>
            {`Vastutuse piiramine`}
            <br />
            {`Teenuseid pakutakse "nagu on" põhimõttel, ilma igasuguse garantiita.
            Me ei vastuta kahjude või kaotuste eest, mis tulenevad teenuste
            kasutamisest.`}
          </li>
          <li>
            {`Teenuste muutmine`}
            <br />
            {`Me võime oma teenuseid, sealhulgas vestlusroboteid ja funktsioone,
            igal ajal muuta või lõpetada.`}
          </li>
          <li>
            {`Privaatsus`}
            <br />
            {`Teie privaatsus on meile oluline. Lugege meie privaatsuspoliitikat,
            et saada teavet teie andmete kogumise ja kasutamise kohta.`}
          </li>
          <li>
            {`Konto lõpetamine`}
            <br />
            {`Me võime teie konto peatada või lõpetada, kui rikute neid tingimusi
            või kui see on platvormi huvides.`}
          </li>
          <li>
            {`Kohaldatav õigus`}
            <br />
            {`Neid tingimusi reguleerivad meie ettevõtte asukohariigi seadused.
            Vaidlused lahendatakse selle riigi kohtutes.`}
          </li>
        </ul>

        <br />

        {/* English Terms of Service */}
        <h1 className="text-lg text-center font-bold mb-6">
          Terms and Conditions
        </h1>

        <p className="text-base text-gray-500 mb-4">
          These terms and conditions govern the use of your Skill-craft platform
          and services, including chatbots and API. By using the services, you
          agree to the following terms:
        </p>

        <ul className="text-base text-gray-500 list-decimal list-inside space-y-4">
          <li>
            <a>User Responsibility</a>
            <br />
            You are responsible for the accuracy of the information you provide
            and all actions that occur on your account. Usage must be lawful.
          </li>
          <li>
            <a>Permitted Use</a>
            <br />
            Our services may only be used legally. Abuse, spamming, and
            unethical activities are prohibited.
          </li>
          <li>
            <a>Limitation of Liability</a>
            <br />
            Services are provided "as is" without any warranty. We are not
            liable for any damages or losses resulting from the use of the
            services.
          </li>
          <li>
            <a>Modification of Services</a>
            <br />
            We may modify or discontinue our services, including chatbots and
            features, at any time.
          </li>
          <li>
            <a>Privacy</a>
            <br />
            Your privacy is important to us. Read our privacy policy to learn
            more about how your data is collected and used.
          </li>
          <li>
            <a>Account Termination</a>
            <br />
            We may suspend or terminate your account if you violate these terms
            or if it is in the interest of the platform.
          </li>
          <li>
            <a>Applicable Law</a>
            <br />
            These terms are governed by the laws of the country where our
            company is located. Disputes will be resolved in the courts of that
            country.
          </li>
        </ul>
      </div>
    </div>
  );
}
