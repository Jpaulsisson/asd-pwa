import { referenceAuth } from '@aws-amplify/backend';

export const auth = referenceAuth({
  userPoolId: 'your-user-pool-id',
  userPoolClientId: 'your-user-pool-client-id',
  identityPoolId: 'your-identity-pool-id',
  authRoleArn: 'your-authenticated-role-arn',
  unauthRoleArn: 'your-unauthenticated-role-arn',
});