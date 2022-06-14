export default function validateFields(fields) {
  const errors = {};

  // VALIDANDO O CAMPO NOME
  if (fields.hasOwnProperty("name")) {
    if (!fields.name) {
      errors.name = "Campo obrigatório!";
    } else if (fields.name < 4 || fields.name > 20) {
      errors.name = "O campo precisa ter entre 4 e 20 caracteres";
    } else if (!/\s\w/g.test(fields.name)) {
      errors.name = "Digite seu nome completo";
    }
  }

  // VALIDANDO O CAMPO CPF
  if (fields.hasOwnProperty("cpf")) {
    if (!fields.cpf) {
      errors.cpf = "Campo obrigatório!";
    }
  }

  // VALIDANDO O CAMPO USERNAME
  if (fields.hasOwnProperty("username")) {
    if (!fields.username) {
      errors.username = "Campo obrigatório!";
    }
  }

  // VALIDANDO O CAMPO PASSWORD
  if (fields.hasOwnProperty("password")) {
    if (!fields.password) {
      errors.password = "Campo obrigatório!";
    }
  }

  console.log(errors);
}
