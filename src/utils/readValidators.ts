import { encode } from 'cbor-x';
import {
  SpendingValidator,
  applyDoubleCborEncoding,
  fromHex,
  toHex,
} from 'lucid-cardano';
import fundValiadators from '../lib/plutus.json';

export type Validators = {
  fund: SpendingValidator;
  fundManagement: SpendingValidator;
};

const readValidators = function (): Validators {
  const fundValidator = fundValiadators.validators.find(function (validator) {
    return validator.title === 'fund.contract';
  });

  const fundManagementValidator = fundValiadators.validators.find(
    (validator) => validator.title === 'manage_fund.contract'
  );

  if (!fundValidator) {
    throw new Error('Fund Validator not found');
  }

  if (!fundManagementValidator) {
    throw new Error('FundManagement Validator not found');
  }

  const fundScriptHex: string = toHex(
    encode(fromHex(fundValidator.compiledCode))
  );

  const fundManagementScriptHex: string = toHex(
    encode(fromHex(fundManagementValidator.compiledCode))
  );

  return {
    fund: {
      type: 'PlutusV2',
      script: fundScriptHex,
    },
    fundManagement: {
      type: 'PlutusV2',
      script: applyDoubleCborEncoding(fundManagementScriptHex),
    },
  };
};

export default readValidators;
