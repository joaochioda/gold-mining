// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./VipStatus.sol";

contract SimpleBank {
    // Mapeamento para armazenar os saldos dos usuários
    mapping(address => uint256) private balances;

    // Referência ao contrato VipStatus
    VipStatus private vipStatus;

    // Construtor para inicializar o endereço do contrato VipStatus
    constructor(address vipStatusAddress) {
        vipStatus = VipStatus(vipStatusAddress);
    }

    // Função para definir o saldo do usuário (adicionar dinheiro)
    function setBalance() external payable {
        require(msg.value > 0, "The amount must be greater than zero");

        // Verifica se o usuário é VIP
        bool isVip = vipStatus.isVip(msg.sender);

        // Ajusta o saldo, dobrando o valor se for VIP
        uint256 amountToCredit = isVip ? msg.value * 2 : msg.value;
        balances[msg.sender] += amountToCredit;
    }

    // Função para obter o saldo do usuário
    function getBalance() external view returns (uint256) {
        return balances[msg.sender];
    }
}
