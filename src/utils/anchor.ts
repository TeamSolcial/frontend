import { Program, AnchorProvider, Idl } from '@project-serum/anchor';
import { Connection, PublicKey } from '@solana/web3.js';
import idl from '../idl/sola_table.json';

const programId = new PublicKey('71WNuqD9qFJbo8ZyjkSg7GHL866PAfxFZNAEW3uisZEX');

export const getProgram = (connection: Connection, wallet: any) => {
  const provider = new AnchorProvider(
    connection,
    wallet,
    AnchorProvider.defaultOptions()
  );

  return new Program(idl as unknown as Idl, programId, provider);
};