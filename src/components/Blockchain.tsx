import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";

import { ChainMetadata, getChainMetadata } from "../helpers";

interface BlockchainProps {
  chainId: string;
  address?: string;
  children?: any;
}

const Blockchain = (props: BlockchainProps) => {
  const { chainId, address } = props;
  let metadata: ChainMetadata | undefined;
  try {
    metadata = getChainMetadata(chainId);
  } catch (e) {
    // ignore
  }
  return metadata ? (
    <View style={styles.chain}>
      <View style={styles.chainMeta}>
        {metadata && <Image style={styles.chainLogo} source={metadata.logo} />}
        <Text style={styles.chainName}>{metadata.name}</Text>
      </View>
      {address && (
        <Text adjustsFontSizeToFit numberOfLines={1} style={styles.address}>
          {address}
        </Text>
      )}
      {props.children}
    </View>
  ) : null;
};

export const styles = StyleSheet.create({
  chain: {
    marginBottom: 10,
  },
  chainMeta: {
    flexDirection: "row",
    alignItems: "center",
  },
  chainLogo: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 15,
  },

  chainName: {
    fontSize: 24,
    fontWeight: "600",
    color: "#000",
  },
  address: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: "400",
    color: "#444",
  },
});

export default Blockchain;
