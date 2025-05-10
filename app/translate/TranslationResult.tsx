import type { Translation } from "domain/types/Translation";
import { useState } from "react";
import Button from "view/components/Button";
import ClipboardCopyIcon from "view/svg/ClipboardCopyIcon";
import Share2Icon from "view/svg/Share2Icon";
import SpeakerIcon from "view/svg/SpearkerIcon";

export default function TranslationResult({
  translation,
}: {
  translation: Translation;
}) {
  const [copied, setCopied] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleCopy = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleListen = (text: string) => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  const handleShare = async (translation: Translation) => {
    if (!navigator.share) return;
    const url = `${window.location.origin}/translate/${translation.id}`;
    await navigator.share({
      title: `${translation.engine} Translation`,
      text: translation.text,
      url: url,
    });
  };
  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <span className="text-sm text-primary font-bold">
            {translation.engine.toUpperCase()}
          </span>
          <span className="text-xs text-muted">
            {new Date(translation.createdAt).toLocaleString()}
          </span>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <p className="text-sm text-muted mb-2">Original Text</p>
          <p className="text-primary text-lg">{translation.text}</p>
        </div>

        <div>
          <p className="text-sm text-muted mb-2">Translation</p>
          <p className="text-primary text-lg">{translation.translated}</p>
        </div>
        <div className="flex items-center space-x-2 pt-2">
          <Button
            variant={copied ? "primary" : "outline"}
            title="Copy translation"
            onClick={() => handleCopy(translation.translated)}
          >
            <ClipboardCopyIcon />
            <span>{copied ? "Copied!" : "Copy"}</span>
          </Button>
          <Button
            variant={isSpeaking ? "primary" : "outline"}
            title="Listen to translation"
            onClick={() => handleListen(translation.translated)}
          >
            <SpeakerIcon />
            <span>{isSpeaking ? "Stop" : "Listen"}</span>
          </Button>
          <Button
            variant="outline"
            title="Share translation"
            onClick={() => handleShare(translation)}
          >
            <Share2Icon />
            <span>Share</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
