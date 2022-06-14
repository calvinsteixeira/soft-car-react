export default function validateFields(fields) {
  const errors = {};
  const validateMethods = {
    isEmptyField: (field) => {
      if (!field) {
        return true;
      } else {
        return false;
      }
    },
    mismatchPattern: (pattern, field) => {
      if (!pattern.test(field)) {
        return true;
      } else {
        return false;
      }
    },
    mismatchLength: (min, max, field) => {
      if (field.length < min || field.length > max) {
        return true;
      } else {
        return false;
      }
    },
  };

  // VERIFICAÇÃO DO CAMPO NOME
  if (fields.hasOwnProperty("name")) {
    if (validateMethods.isEmptyField(fields.name)) {
      errors.nomeUsuario = "Campo obrigatório!";
    } else if (validateMethods.mismatchLength(4, 20, fields.name)) {
      errors.nomeUsuario = "O campo precisa ter entre 4 e 20 caracteres";
    } else if (validateMethods.mismatchPattern(/\s\w{3}/g, fields.name)) {
      errors.nomeUsuario = "Digite seu nome completo";
    }
  }

  // VERIFICAÇÃO DO CAMPO CPF
  if (fields.hasOwnProperty("cpf")) {
    if (validateMethods.isEmptyField(fields.cpf)) {
      errors.cpf = "Campo obrigatório!";
    } else if (validateMethods.mismatchLength(14, 14, fields.cpf)) {
      errors.cpf = "Digite seu CPF completo";
    } else if (
      validateMethods.mismatchPattern(
        /[0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2}/,
        fields.cpf
      )
    ) {
      errors.cpf = "Campo em formato inválido!";
    }
  }

  return errors;
}
