export function validateFields(fields) {
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
      errors.name = "Campo obrigatório!";
    } else if (validateMethods.mismatchLength(4, 80, fields.name)) {
      errors.name = "O campo precisa ter entre 4 e 20 caracteres";
    } else if (
      validateMethods.mismatchPattern(
        /^(([A-z]+)\s+([A-z]+)){1,}$/,
        fields.name
      )
    ) {
      errors.name = "Digite um nome e sobrenome válidos";
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
      errors.cpf = "Use o formato correto 999.999.999-99!";
    }
  }

  // VERIFICAÇÃO DO CAMPO USERNAME
  if (fields.hasOwnProperty("username")) {
    if (validateMethods.isEmptyField(fields.username)) {
      errors.username = "Campo obrigatório!";
    } else if (validateMethods.mismatchLength(4, 10, fields.username)) {
      errors.username = "O campo precisa ter entre 4 e 10 caracteres";
    } else if (
      validateMethods.mismatchPattern(/^([a-z]{1,})$/, fields.username)
    ) {
      errors.username = "Use apenas letras minusculas, sem espaços ou símbolos";
    }
  }

  // VERIRICAÇÃO DO CAMPO PASSWORD
  if (fields.hasOwnProperty("password")) {
    if (validateMethods.isEmptyField(fields.password)) {
      errors.password = "Campo obrigatório!";
    } else if (validateMethods.mismatchLength(4, 10, fields.password)) {
      errors.password = "O campo precisa ter entre 4 e 10 caracteres";
    } else if (
      validateMethods.mismatchPattern(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        fields.password
      )
    ) {
      errors.password =
        "Sua senha precisa ter pelo menos 1 símbolo, 1 letra minuscula e 1 número";
    }
  }

  return errors;
}
