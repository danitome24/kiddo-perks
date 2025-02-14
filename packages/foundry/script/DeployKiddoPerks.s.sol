//SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import { KiddoPerks } from "../contracts/KiddoPerks.sol";
import { KDOToken } from "../contracts/KDOToken.sol";
import { KDONft } from "../contracts/KDONft.sol";
import { ScaffoldETHDeploy, console } from "./DeployHelpers.s.sol";
import { Base64 } from "@openzeppelin/contracts/utils/Base64.sol";

contract DeployKiddoPerks is ScaffoldETHDeploy {
  // use `deployer` from `ScaffoldETHDeploy`
  function run() external ScaffoldEthDeployerRunner {
    string memory fiveTasksAchievedSvg =
      vm.readFile("./nfts/5TasksAchieved.svg");
    string memory tenTasksAchievedSvg =
      vm.readFile("./nfts/10TasksAchieved.svg");
    string memory twentyTasksAchievedSvg =
      vm.readFile("./nfts/20TasksAchieved.svg");
    string memory fiftyTasksAchievedSvg =
      vm.readFile("./nfts/50TasksAchieved.svg");
    string memory hundredTasksAchievedSvg =
      vm.readFile("./nfts/100TasksAchieved.svg");

    address PARENT = 0x27dBc64e6C38633eD526d970258372476BCE58C0;

    KDOToken token = new KDOToken();

    KiddoPerks kiddoPerks = new KiddoPerks(token);

    KDONft nft = new KDONft(
      address(kiddoPerks),
      fiveTasksAchievedSvg,
      tenTasksAchievedSvg,
      twentyTasksAchievedSvg,
      fiftyTasksAchievedSvg,
      hundredTasksAchievedSvg
    );

    console.logString(
      string.concat(
        "KiddoPerks deployed at: ", vm.toString(address(kiddoPerks))
      )
    );
    console.logString(
      string.concat("KDONft deployed at: ", vm.toString(address(nft)))
    );
    kiddoPerks.setParent(PARENT);
    token.transferOwnership(address(kiddoPerks));
  }

  function svgToImageURI(
    string memory svg
  ) public pure returns (string memory) {
    string memory baseUrl = "data:image/svg+xml;base64,";
    string memory svgBase64Encoded =
      Base64.encode(bytes(string(abi.encodePacked(svg))));

    return string(abi.encodePacked(baseUrl, svgBase64Encoded));
  }
}
