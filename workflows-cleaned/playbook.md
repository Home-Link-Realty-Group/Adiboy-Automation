# playbook

Source: playbook.docx

import { createClient } from '@base44/sdk';

import { appParams } from '@/lib/app-params';

const { token, functionsVersion, appBaseUrl } = appParams;

export const base44 = createClient({

  appId: "69d48de0b96337e8cdc27f54",

  token,

  functionsVersion,

  requiresAuth: false,

  appBaseUrl

});
