export const CONTRACT_ADDRESS = {
  TreeNFT: "0x16b41e517D8Db1260683e421b5eA6472Fb4D234a",
  TreeAuditorRegistry: "0x8d5C8E9AD6865cB80Cb86Cc4Ee7643062AB0329B",
  TreeController: "0xB0d4C0bc1D323abe1b043D9f26E9eCB0f2F45f4F",
};

export const CONTRACT_NAMES = Object.entries(CONTRACT_ADDRESS).reduce<
  Record<string, string>
>((prev, cur) => {
  const [name, address]: any = cur;
  prev[address] = name;
  return prev;
}, {});

export const ADDRESS_LIST: Record<string, string> = {
  ...CONTRACT_ADDRESS,
  ...Object.values(CONTRACT_ADDRESS).reduce<Record<string, string>>(
    (prev, cur: any) => {
      prev[cur] = cur;
      return prev;
    },
    {}
  ),
};
