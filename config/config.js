const config = {
    // The CA's id that will be used to issue a certificate using Amplia. We
    // have configured to the sample CA from sample subscription for these
    // samples.
    caId: 'eaffa754-1fb5-474a-b9ef-efe43101e89f',

    // ========================================================
    //     >>>> PASTE YOUR AMPLIA API KEY BELOW <<<<
    // ========================================================
    apiKey:
      'pki-suite-samples-01|ee9a3416cc231a4ab177ccdee926d03f658a83d3673398514e99e21f590e8744',
    // This is a TRIAL API key to use Amplia. It will expire at 31/12/2022.
    // If the Amplia's samples do not work please contact our support by email:
    // suporte@lacunasoftware.com
    //
    // In order to use this sample on a "on premises" installation of
    // Amplia, fill the field below with the URL address of your Amplia
    // installation (with the trailing '/' character).
    endpoint: 'https://amplia.lacunasoftware.com/',
  };

export default config;
