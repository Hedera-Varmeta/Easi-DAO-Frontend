// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/cryptography/EIP712Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721VotesUpgradeable.sol";

contract ERC721VotesStandard is
    ERC721Upgradeable,
    EIP712Upgradeable,
    ERC721VotesUpgradeable
{
    function initialize(
        string calldata name,
        string calldata symbol
    ) public initializer returns (bool) {
        __ERC721_init(name, symbol);
        __EIP712_init(name, "1");
        __ERC721Votes_init();

        return true;
    }

    function _afterTokenTransfer(
        address from,
        address to,
        uint256 tokenId,
        uint256 batchSize
    ) internal override(ERC721Upgradeable, ERC721VotesUpgradeable) {
        super._afterTokenTransfer(from, to, tokenId, batchSize);
    }
}
