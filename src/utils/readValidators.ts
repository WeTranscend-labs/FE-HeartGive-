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
  fundVerified: SpendingValidator;
};

const readValidators = function (): Validators {
  const fundValidator = fundValiadators.validators.find(function (validator) {
    return validator.title === 'fund.contract';
  });

  const fundManagementValidator = fundValiadators.validators.find(
    (validator) => validator.title === 'manage_fund.contract'
  );

  const fundVerifiedValidator = fundValiadators.validators.find(
    (validator) => validator.title === 'verify_funds.contract'
  );

  if (!fundValidator) {
    throw new Error('Fund Validator not found');
  }

  if (!fundManagementValidator) {
    throw new Error('FundManagement Validator not found');
  }

  if (!fundVerifiedValidator) {
    throw new Error('fundVerifiedValidator not found');
  }

  const fundScriptHex: string = toHex(
    encode(fromHex(fundValidator.compiledCode))
  );

  const fundManagementScriptHex: string = toHex(
    encode(fromHex(fundManagementValidator.compiledCode))
  );

  const fundVerifiedScriptHex: string = toHex(
    encode(fromHex(fundVerifiedValidator.compiledCode))
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
    fundVerified: {
      type: 'PlutusV2',
      script: applyDoubleCborEncoding(fundVerifiedScriptHex),
    },
  };
};

export default readValidators;
