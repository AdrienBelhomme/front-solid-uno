import type { Component, JSX } from "solid-js";
import { createContext } from "solid-js";
import type { AuthChangeEvent, Session, SupabaseClient } from "@supabase/supabase-js";
import { createRenderEffect, onCleanup, useContext } from "solid-js";

export const SupabaseContext = createContext<SupabaseClient>();

interface Props {
  client: SupabaseClient;
  children?: JSX.Element;
}

export const SupabaseProvider: Component<Props> = (props) => {
  return <SupabaseContext.Provider value={props.client}>{props.children}</SupabaseContext.Provider>;
};

export const createSupabase = () => {
  const ctx = useContext(SupabaseContext);

  if (!ctx) throw new Error("createSupabase must be used within a SupabaseContext.Provider");

  return ctx;
};

export function createSupabaseAuth(): SupabaseClient["auth"] {
  const supabase = createSupabase();
  return supabase.auth;
}

export function createSupabaseStorage(): SupabaseClient["storage"] {
  const supabase = createSupabase();
  return supabase.storage;
}

export function createSupabaseFrom(): SupabaseClient["from"] {
  const supabase = createSupabase();
  return supabase.from;
}

type AuthChangeHandler = (event: AuthChangeEvent, session: Session | null) => void;

export function createOnAuthStateChange(callback: AuthChangeHandler): void {
  const client = createSupabase();

  const { data: authListener } = client.auth.onAuthStateChange((event, session) => {
    callback(event, session);
  });

  createRenderEffect(() => {
    client.auth.getSession().then(({ data }) => {
      if (data.session) callback("SIGNED_IN", data.session);
    });

    onCleanup(() => {
      authListener.subscription?.unsubscribe();
    });
  });

}
