import { DIAGONAL_FACTOR } from "../constants";
import {
  isEmailModalVisibleAtom,
  isProjectModalVisibleAtom,
  isSocialModalVisibleAtom,
  store,
} from "../store";

export default function makePlayer(k, posVec2, speed) {
  const player = k.add([
    k.sprite("player", { anim: "walk-down" }),
    k.scale(2),
    k.anchor("center"),
    k.area({ shape: new k.Rect(k.vec2(0), 5, 10) }),
    k.body(),
    k.pos(posVec2),
    "player",
    {
      direction: k.vec2(0, 0),
      directionName: "walk-down",  // 初始动画是 "walk-down"
    },
  ]);

  let isMouseDown = false;
  const game = document.getElementById("game");
  game.addEventListener("focusout", () => {
    isMouseDown = false;
  });
  game.addEventListener("mousedown", () => {
    isMouseDown = true;
  });

  game.addEventListener("mouseup", () => {
    isMouseDown = false;
  });

  game.addEventListener("touchstart", () => {
    isMouseDown = true;
  });

  game.addEventListener("touchend", () => {
    isMouseDown = false;
  });

  player.onUpdate(() => {
    if (!k.camPos().eq(player.pos)) {
      k.tween(
        k.camPos(),
        player.pos,
        0.2,
        (newPos) => k.camPos(newPos),
        k.easings.linear
      );
    }

    if (
      store.get(isSocialModalVisibleAtom) ||
      store.get(isEmailModalVisibleAtom) ||
      store.get(isProjectModalVisibleAtom)
    )
      return;

    player.direction = k.vec2(0, 0);
    const worldMousePos = k.toWorld(k.mousePos());

    if (isMouseDown) {
      player.direction = worldMousePos.sub(player.pos).unit();
    }

    // 如果玩家没有移动，就播放对应方向的 idle 动画
    if (player.direction.eq(k.vec2(0, 0))) {
      // 如果当前的动画不是 idle，就播放 idle 动画
      if (!player.getCurAnim().name.includes("idle")) {
        player.play(`${player.directionName}-idle`);
      }
      return;  // 如果静止，直接返回，不继续执行其他逻辑
    }

    // 根据方向设置 animation 名称
    if (
      player.direction.x > 0 &&
      player.direction.y > -0.5 &&
      player.direction.y < 0.5
    ) {
      player.directionName = "walk-right";
    }

    if (
      player.direction.x < 0 &&
      player.direction.y > -0.5 &&
      player.direction.y < 0.5
    )
      player.directionName = "walk-left";

    if (player.direction.x < 0 && player.direction.y < -0.8)
      player.directionName = "walk-up";

    if (player.direction.x < 0 && player.direction.y > 0.8)
      player.directionName = "walk-down";

    if (
      player.direction.x < 0 &&
      player.direction.y > -0.8 &&
      player.direction.y < -0.5
    )
      player.directionName = "walk-left-up";

    if (
      player.direction.x < 0 &&
      player.direction.y > 0.5 &&
      player.direction.y < 0.8
    )
      player.directionName = "walk-left-down";

    if (
      player.direction.x > 0 &&
      player.direction.y < -0.5 &&
      player.direction.y > -0.8
    )
      player.directionName = "walk-right-up";

    if (
      player.direction.x > 0 &&
      player.direction.y > 0.5 &&
      player.direction.y < 0.8
    )
      player.directionName = "walk-right-down";

    // 如果当前动画和目标方向不同，则切换到新的动画
    if (player.getCurAnim().name !== player.directionName) {
      player.play(player.directionName);
    }

    // 玩家移动
    if (player.direction.x && player.direction.y) {
      player.move(player.direction.scale(DIAGONAL_FACTOR * speed));
      return;
    }

    player.move(player.direction.scale(speed));
  });

  return player;
}
