# FinanControl

**Versão Atual:** 1.1

## Descrição

O **FinanControl** é um site de controle financeiro que permite aos usuários gerenciar suas contas e saldos de forma fácil e intuitiva. Utilizando tecnologias modernas, a aplicação oferece uma interface amigável e funcionalidade para acompanhar despesas e receitas.

## Tecnologias Utilizadas

- HTML
- CSS
- JavaScript (JS)
- TypeScript (TS)
- jQuery
- JSON
- Git e GitHub
- Figma (para design)
- Visual Studio Code (VSCode)

## Como Funciona

- As contas e o salário do usuário são armazenados no `localStorage`.
- Um gráfico interativo calcula o total de todas as contas salvas.
- O saldo exibido é o valor que o usuário insere.
- Cada conta paga é descontada do saldo disponível.
- O cálculo dos ganhos mensais é feito subtraindo o total das contas a pagar do salário do usuário.
- O total a pagar é a soma de todas as contas pendentes.

## Funcionalidades Futuras

- Separar contas e gastos por mês, assim como o gráfico.
- Implementar notificações para avisar sobre o vencimento das contas.
- Adicionar novas funcionalidades com base no feedback dos usuários.
- Implementar um banco de dados para a criação de contas de usuário, permitindo que cada um acesse sua conta em qualquer dispositivo.

## Como Contribuir

1. Faça um fork do repositório.
2. Crie uma nova branch (`git checkout -b feature/MinhaFuncionalidade`).
3. Faça suas alterações e commit (`git commit -m 'Adiciona uma nova funcionalidade'`).
4. Faça push para a branch (`git push origin feature/MinhaFuncionalidade`).
5. Abra um Pull Request.

## Licença

Este projeto é licenciado sob a [Licença MIT](LICENSE).
