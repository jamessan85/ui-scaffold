import fetch from 'node-fetch';
import config from '../config';

const makeRequest = async ({ url, options }: any) => {
  const response = await fetch(url, options);
  const data = await response.text();
  return data;
};

const fetchCIS2AccessToken = (code: string) => {
  const data = {
    options: {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        Host: 'am.nhsdev.auth-ptl.cis2.spineservices.nhs.uk:443',
      },
      method: 'POST',
    },
    url: `${
      config.cis2Host
    }/openam/oauth2/realms/root/realms/oidc/access_token?${new URLSearchParams({
      client_id: config.cis2ClientID,
      client_secret: config.cis2ClientSecret,
      code,
      grant_type: 'authorization_code',
      redirect_uri: config.cis2RedirectURI,
    })}`,
  };
  return makeRequest({ options: data.options, url: data.url });
};

const fetchCIS2UserInfo = (accessToken: string) => {
  const url = `${config.cis2Host}/openam/oauth2/realms/root/realms/oidc/userinfo`;
  const options = {
    headers: { Authorization: `Bearer ${accessToken}`, method: 'GET' },
  };
  return makeRequest({ options, url });
};

export { fetchCIS2AccessToken, fetchCIS2UserInfo };
