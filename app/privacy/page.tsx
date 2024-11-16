import React from "react";

export default function PrivacyPolicy() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="p-6 w-full my-4 max-w-xl bg-white shadow-md rounded-md">
        <h1 className="text-lg text-center font-bold mb-6">
          Privaatsuspoliitika
        </h1>
        <p className="text-base text-gray-500 mb-4">
          Järgmisena suhtlete vestlusrobotiga, mis aitab teil oma projektidee
          arendamisel. Vestlusrobot kasutab tehisintellekti, et genereerida
          sobivaid vastuseid. Kasutame seda tehnoloogiat, et testida ja edasi
          arendada AI-põhiseid lahendusi hariduses.
        </p>
        <p className="text-base text-gray-500 mb-4">
          Vestlusrobot kasutab Open AI API-d, seega töödeldakse teie sõnumeid
          osaliselt Open AI serverites. Teil on kontroll selle üle, millist
          teavet te jagate ja millist mitte.
        </p>
        <p className="text-base text-gray-500 mb-4">
          Vestlusroboti kasutamise hindamiseks anonümiseerime teie suhtluse
          pärast kursuse lõpetamist ja kasutame seda teadusuuringuteks. Kõik
          teadusuuringuteks kasutatavad andmed on anonüümsed ja teie
          isikuandmeid ei avaldata.
        </p>
        <p className="text-base text-gray-500 mb-4">
          Suhtlemine vestlusrobotiga on vabatahtlik ja ei ole kursuse läbimise
          eeltingimus. Võite igal ajal vestluse katkestada, ilma et see mõjutaks
          teie kursuse sooritust negatiivselt.
        </p>
        <br />
        {/* English Translation */}
        <h1 className="text-lg text-center font-bold mb-6">Privacy Policy</h1>
        <p className="text-base text-gray-500 mb-4">
          You will soon be interacting with a chatbot that helps you develop
          your project idea. The chatbot uses artificial intelligence to
          generate appropriate responses. We use this technology to test and
          develop AI-based solutions in education.
        </p>
        <p className="text-base text-gray-500 mb-4">
          The chatbot uses the OpenAI API, so your messages are partially
          processed on OpenAI servers. You have control over what information
          you share and what you choose not to share.
        </p>
        <p className="text-base text-gray-500 mb-4">
          To evaluate the use of the chatbot, we will anonymize your
          communication after the course is completed and use it for research
          purposes. All data used for research will be anonymized, and your
          personal information will not be disclosed.
        </p>
        <p className="text-base text-gray-500 mb-4">
          Interaction with the chatbot is voluntary and not a prerequisite for
          completing the course. You can terminate the conversation at any time
          without it negatively affecting your course performance.
        </p>
      </div>
    </div>
  );
}
