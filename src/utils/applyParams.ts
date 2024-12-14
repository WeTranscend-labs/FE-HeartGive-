import {
  applyDoubleCborEncoding,
  applyParamsToScript,
  fromText,
  Lucid,
  SpendingValidator,
} from 'lucid-cardano';
import { Validators } from './readValidators';

type Props = {
  validators: Validators;
  fundOwner: string;
  lucid: Lucid;
  randomHashKey: string;
};
export type AppliedValidators = {
  fund: SpendingValidator;
  fundManagement: SpendingValidator;
  fundVerified: SpendingValidator;
  fundAddress: string;
};

export const applyParams = ({
  validators,
  fundOwner,
  lucid,
  randomHashKey,
}: Props): AppliedValidators => {
  const fund = applyParamsToScript(validators.fund.script, [
    fundOwner,
    fromText(randomHashKey),
  ]);

  const fundAddress = lucid.utils.validatorToAddress({
    type: 'PlutusV2',
    script: fund,
  });

  console.log(fundAddress);

  return {
    fund: { type: 'PlutusV2', script: applyDoubleCborEncoding(fund) },
    fundVerified: { type: 'PlutusV2', script: validators.fundVerified.script },
    fundManagement: {
      type: 'PlutusV2',
      script: validators.fundManagement.script,
    },
    fundAddress: fundAddress,
  };
};
