import { Program, AnchorProvider, setProvider } from "@coral-xyz/anchor";
import { Connection } from '@solana/web3.js';
import type { SolaTable } from "../types/sola_table";
import idl from "../idl/sola_table.json";

export const getProgram = (connection: Connection, wallet: any) => {
  const provider = new AnchorProvider(
    connection,
    wallet,
    AnchorProvider.defaultOptions()
  );
  setProvider(provider);

  return new Program(idl as unknown as SolaTable, provider);
};
