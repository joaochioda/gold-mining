// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VipStatus {
    // Mapeamento para armazenar se um endereço é VIP
    mapping(address => bool) private vipMembers;

    // Apenas o proprietário pode adicionar VIPs
    address private owner;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can manage VIPs");
        _;
    }

    // Função para definir o status VIP
    function setVip(address _account, bool _isVip) external onlyOwner {
        vipMembers[_account] = _isVip;
    }

    // Função para verificar se um endereço é VIP
    function isVip(address _account) external view returns (bool) {
        return vipMembers[_account];
    }
}
