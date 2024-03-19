interface UserData {
  nome: string;
  email: string;
  telefone: string;
  empresa: string;
}

const loginFormHandler = (formData: FormData) => {
  const userData = {
    nome: formData.get('name') as string,
    email: formData.get('email') as string,
    telefone: formData.get('phone') as string,
    empresa: formData.get('company') as string,
  };

  const userList = JSON.parse(localStorage.getItem('users') || '[]') as UserData[];

    const existingUserIndex = userList.findIndex(user => user.email === userData.email);

    if (existingUserIndex === -1) {
        userList.push(userData);

        localStorage.setItem('users', JSON.stringify(userList));

        console.log('Usuário adicionado com sucesso');
    } else {
        console.log('Usuário já cadastrado');
    }
};

export default loginFormHandler;
