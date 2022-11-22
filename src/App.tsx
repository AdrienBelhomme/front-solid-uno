import { Routes, Route, Outlet } from "@solidjs/router";
import {
  Component,
  createContext,
  createEffect,
  createSignal,
  For,
  JSXElement,
  onMount,
  Show,
  useContext,
} from "solid-js";
import { createSelasClient, Result } from "selas";
import { Atom, atom } from "solid-use";
import { createOnAuthStateChange, createSupabase, createSupabaseAuth, SupabaseProvider } from "./supabase";
import { ThemeProvider } from "./contexts/dark";
import { saveAs } from "file-saver";
import translate from "translate";

translate.engine = "deepl";
translate.key = import.meta.env.VITE_DEEPL_KEY;

import logo_selas from "./assets/logo-selas.svg?url";
import logo_artify from "./assets/logo_artify.png?url";

const prompt = atom("");
const results = atom([]);
const paysage = atom(true);
const downloads = atom(0);
const language = atom(localStorage.getItem("language") || "en");

const App: Component = () => {
  const paysage = atom(true);

  createEffect(() => {
    if (results().length == 0) {
      downloads(0);
    }
  });

  createEffect(() => {
    localStorage.setItem("language", language());
  });

  return (
    <div class="relative max-w-1080px mx-auto px-2rem">
      <div class="flex flex-col  align-items-center justify-start text-center py-6rem">
        <a href="https://artify.fr">
          <img class="h-10rem" src={logo_artify} />
        </a>
        <a
          href="https://selas.ai"
          target="blank_"
          class="flex justify-center align-items-center gap-0.7rem color-text font-italic -mt-1.5rem"
        >
          <div class="">powered by</div>
          <img class="h-1.5rem" src={logo_selas}></img>
        </a>
      </div>
      <Language />
      <SimplePrompt />
      <PaysagePortrait />
      <ImageDisplay />
      <div></div>
    </div>
  );
};

const Language: Component = () => {

  return (
    <div class="absolute top-1rem right-1rem fs-3rem flex align-items-center gap-1rem">
      <button class={`i-twemoji:flag-united-kingdom rounded-8px transition ${language()=="en" ? "fs-3.4rem" : "hover:ring-blue hover:ring-2px"}`} onClick={() => language("en")}></button>
      <button class={`i-twemoji:flag-france rounded-8px transition ${language()=="fr" ? "fs-3.4rem" : "hover:ring-blue hover:ring-2px"}`} onClick={() => language("fr")}></button>
    </div>
  )
}

const SimplePrompt: Component = (props) => {
  const selas = createSelasClient();

  const loading = atom(false);

  const handleNewResult = async (payload) => {
    console.log(payload);
    const result: Result = payload.new;
    results([...results(), result]);

    if (results().length == 4) {
      loading(false);
    }
  };

  onMount(async () => {
    await selas.signIn("benjamin@selas.studio", "tromtrom");
  });

  const submitJob = async (e: Event) => {
    e.preventDefault();

    if (prompt().length <= 3) {
      alert(language() == "fr" ? "Votre prompt doit faire plus de 3 caractères" : "Your prompt must be more than 3 characters");
      return;
    }
    loading(true);
    results([]);
    if (language() == "fr") {
    const text = await translate(prompt(), { from: "fr", to: "en" });
    console.log(text);
    } else {
      const text = prompt();
    }

    const {
      data: job,
      message,
      error,
    } = await selas.runStableDiffusion(
      text,
      // @ts-ignore
      paysage() ? 768 : 512,
      paysage() ? 512 : 768,
      // @ts-ignore
      50,
      10,
      "ddim",
      4,
      "jpg",
      false,
      "",
      { branch: "main", is_dirty: true }
    );
    console.log("job", job);

    selas.subscribeToResults(job.id, handleNewResult);
  };

  return (
    <div class="w-full">
      <div class="flex flex-col gap-0.4rem">
        <h1 class="color-dark/90 lh-0.8rem text-left lg:text-left">
          {language() == "fr" ? "Décrivez en quelques mots ce vous souhaitez créer" : "Describe in a few words what you want to create"}
        </h1>
        <div class="flex flex-col lg:flex-row group">
          <textarea
            placeholder={language() == "fr" ? "une vue aérienne de la tour eiffel par chagall..." : "an aerial view of the eiffel tower by chagall..."}
            class="peer w-full sexybar placeholder-color-dark/30 bg-base/20 font-mono fs-1rem lh-1rem py-1rem px-1rem lg:rounded-l-12px transition duration-500 shadow-md shadow-blu/20 focus:shadow-lg focus:shadow-blu/50 h-7rem md:h-5rem lg:h-4rem xl:h-3rem outline-none border-none resize-none"
            onInput={(e) => {
              prompt(e.currentTarget.value);
            }}
          />
          <Show
            when={!loading()}
            fallback={
              <button
                class="flex btn bg-blu align-items-center rounded-t-0 lh-1.4rem transition duration-500 fs-0.9rem md:fs-1rem lg:rounded-r-12px lg:rounded-l-0px lg:w-142px shadow-md shadow-blu/30 peer-focus:shadow-lg peer-focus:shadow-blu/50  xl:h-3rem"
                disabled
              >
                <div class="i-fluent:spinner-ios-20-filled animate-spin color-white h-1.6rem w-1.6rem mx-auto" />
              </button>
            }
          >
            <button
              onClick={submitJob}
              class="flex btn bg-blu rounded-t-0 lh-1.4rem align-items-center transition duration-500 fs-0.9rem md:fs-1rem lg:rounded-r-12px lg:rounded-l-0px lg:w-142px shadow-md shadow-blu/30 peer-focus:shadow-lg peer-focus:shadow-blu/50  xl:h-3rem"
            >
              <span class="mx-auto">{language() == "fr" ? "GÉNÉRER" : "GENERATE"}</span>
            </button>
          </Show>
        </div>
      </div>
    </div>
  );
};

const PaysagePortrait: Component = (props) => {
  return (
    <div class="flex mx-auto max-w-1080px justify-center py-6rem align-items-center gap-4rem cursor-pointer">
      {/* paysage */}
      <div
        class="flex flex-col gap-1rem align-items-center group"
        onClick={() => {
          paysage(false);
          results([]);
        }}
      >
        <div
          class={`${
            !paysage() ? "scale-110 bg-blu/90 shadow-xl" : "bg-base group-hover:bg-blu/70 group-hover:shadow-lg"
          } aspect-3/4 h-6rem rounded-12px transition duration-500`}
        />
        <div class={`${paysage() ? "color-blu" : "group-hover:color-blu/60"} font-bold transition duration-500`}>
         {language() == "fr" ? "Portrait" : "Portrait"}
        </div>
      </div>
      {/* portrait */}
      <div
        class="flex flex-col gap-1rem align-items-center group"
        onClick={() => {
          paysage(true);
          results([]);
        }}
      >
        <div
          class={`${
            paysage() ? "scale-110 bg-blu/90 shadow-xl" : "bg-base group-hover:bg-blu/70 group-hover:shadow-lg"
          } aspect-4/3 h-6rem rounded-12px transition duration-500`}
        />
        <div class={`${!paysage() ? "color-blu" : "group-hover:color-blu/60"} font-bold transition duration-500`}>
        {language() == "fr" ? "Paysage" : "Landscape"}
        </div>
      </div>
    </div>
  );
};

const ImageDisplay: Component = (props) => {
  return (
    <Show when={results().length == 4}>
      <div class="fixed top-0 left-0 h-screen w-screen bg-black/40 flex justify-center align-items-center px-4rem">
        <div class="bg-white/70 rounded-12px w-full p-4rem backdrop-blur max-w-1024px">
          {/* Titre */}
          <h1 class="font-bold fs-1.6rem text-center">{prompt()}</h1>
          {/* images */}
          <div class={`${paysage() ? "grid grid-cols-2" : "flex"} gap-1rem py-4rem px-2rem md:px-4rem lg:px-8rem`}>
            <For each={results()}>{(result) => <Image url={result.uri} />}</For>
          </div>
          {/* Bouton */}
          <div class="btn bg-blu rounded-12px text-center cursor-pointer mx-auto" onClick={() => results([])}>
            Recommencer
          </div>
        </div>
      </div>
    </Show>
  );
};

const Image: Component<{ url: string }> = (props) => {
  const downloaded = atom(false);

  const downloadImage = async () => {
    const blob = await (await fetch(props.url)).blob();
    const objectUrl = URL.createObjectURL(blob);
    const j = document.createElement("a");
    j.href = objectUrl;
    j.download = `${new Date().toISOString()}.png`;
    document.body.appendChild(j);
    j.click();
    document.body.removeChild(j);
    downloaded(true);

    downloads(downloads() + 1);

    if (downloads() >= 2) {
      results([]);
    }
  };

  return (
    <Show
      when={!downloaded()}
      fallback={<div class="transition cursor-pointer bg-surface0" onClick={downloadImage}></div>}
    >
      <div class="hover:ring-4 hover:shadow-xl ring-blu transition cursor-pointer" onClick={downloadImage}>
        <img src={props.url} />
      </div>
    </Show>
  );
};

export default App;
