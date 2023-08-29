-include .env

deploy-sepolia:
	forge script script/DeployAuroraTokenTribute.s.sol:DeployAuroraTokenTribute --rpc-url $(RPC) --private-key $(KEY) --broadcast --verify --etherscan-api-key $(ETHERSCAN) -vvvv