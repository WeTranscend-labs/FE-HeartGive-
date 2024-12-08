import { encode } from 'cbor-x';
import { SpendingValidator, fromHex, toHex } from 'lucid-cardano';
import fundValidatorsScript from '../lib/plutus.json';

const readValidators = function (): SpendingValidator {
  const fundValidators = fundValidatorsScript.validators.find(
    function (validator) {
      return validator.title === 'contract.contract';
    }
  );

  if (!fundValidators) {
    throw new Error('Marketplace validator not found');
  }

  const fundScriptHex: string = toHex(
    encode(fromHex(fundValidators.compiledCode))
  );

  return {
    type: 'PlutusV2',
    script: fundScriptHex,
  };
};

export default readValidators;
