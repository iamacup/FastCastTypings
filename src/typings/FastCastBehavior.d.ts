import ActiveCast from './ActiveCast';

/**
 * FastCastRayInfo is a type storing basic information needed for FastCast's simulations.
 */
declare interface FastCastBehavior {
    //Properties

    /**
     * The RaycastParams that apply to all casts fired from this Caster.
     * When the Fire method is called, this RaycastParams is duplicated.
     */
    RaycastParams?: RaycastParams;

    /**
     * The maximum distance that this cast can travel.
     * If the cast continues travelling without hitting any parts,
     * and the distance it has traveled in total exceeds this value,
     * then the cast will be automatically terminated, firing the CastTerminated event (see Caster)
     */
    MaxDistance: number;

    /**
     * The constant force applied to this cast. This is good for things like gravity that affects projectiles, or a constant force of wind.
     */
    Acceleration: Vector3;

    /**
     * A template for your cosmetic bullet, if desired.
     * Every time the Fire method is called, this template will be duplicated and parented to CosmeticBulletContainer.
     * It will then be passed into the LengthChanged event so that it can be CFramed or updated in whatever manner is desired to visually display the cast.
     * 
     * Overridden by CosmeticBulletProvider.
     */
    CosmeticBulletTemplate?: Instance;

    /**
     * An alternative to CosmeticBulletTemplate that,
     * rather than having FastCast clone the part when its created,
     * provides a PartCache instance that FastCast can use to acquire new cosmetic bullet instances.
     * This is important for performance in large-scale games with lots of bullets going around,
     * and should be used in favor of CosmeticBulletTemplate for large games.
     * 
     * Requires [PartCache](https://devforum.roblox.com/t/partcache-for-all-your-quick-part-creation-needs/246641).
     * 
     * Overrides CosmeticBulletTemplate.
     */
    CosmeticBulletProvider: PartCache;

    /**
     * If true, and if your RaycastParams is using a Blacklist,
     * the CosmeticBulletContainer instance will be appended to the blacklist if it is not there already.
     * It will be appended when the Fire method is called. This will not function if it is using a Whitelist.
     */
    AutoIgnoreContainer: boolean;

    /**
     * A function that is called by FastCast whenever a ray hits something.
     * It should return true if the ray is allowed to pierce the object, and false if the ray should terminate.
     * 
     * @param cast A reference to the ActiveCast that called this function.
     * @param result The RaycastResult that was acquired before calling this function.
     * @param segmentVelocity A Vector3 representing the velocity of the ray at the time that it hit.
     * 
     * @example ```ts
     * function CanRayPierce(cast: ActiveCast, result: RaycastResult, segmentVelocity: Vector3) {
     *      // Lets pretend my projectile is a laser.
     *      if (result.Instance.Transparency >= 0.5) {
     *          // This part is at least 50% transparent.
     *          // My laser can pass through these parts.
     *          return true;
     *      }
     *      // It's less than 50% transparent. My laser can not go through these parts.
     *      return false;
     * }
     * ```
     */
    CanPierceFunction: (cast: ActiveCast, result: RaycastResult, segmentVelocity: Vector3) => boolean;
}

declare interface PartCache { }

export = FastCastBehavior;