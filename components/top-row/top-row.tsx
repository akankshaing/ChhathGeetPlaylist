import { Clock } from "./clock";
import { ListenerCount } from "./listener-count";
import { SocialLinks } from "./social-links";

export function TopRow() {
  return (
    <div className="safe-t safe-l safe-r fixed z-10 flex w-full items-center justify-between px-1">
      <div className="pl-3">
        <Clock />
      </div>
      <div>
        <ListenerCount />
      </div>
      <div className="pr-1">
        <SocialLinks />
      </div>
    </div>
  );
}
