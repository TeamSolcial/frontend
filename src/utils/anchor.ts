import { Program, AnchorProvider, Idl } from '@project-serum/anchor';
import { Connection, PublicKey } from '@solana/web3.js';
import idl from '../idl/sola_table.json';

const programId = new PublicKey('GdFRCmL2NYrB42712pU45t8C9Uj1nKLYKzg8NjkrsPoK');

export const getProgram = (connection: Connection, wallet: any) => {
  const provider = new AnchorProvider(
    connection,
    wallet,
    AnchorProvider.defaultOptions()
  );

  return new Program(idl as unknown as Idl, programId, provider);
};