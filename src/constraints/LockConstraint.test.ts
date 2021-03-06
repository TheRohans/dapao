import { Body } from '../objects/Body';
import { Vec3 } from '../math/Vec3';
import { LockConstraint } from './LockConstraint';

describe('LockConstraint', () => {
  it('should construct', () => {
    const bodyA = new Body({ mass: 1, position: new Vec3(1, 0, 0) });
    const bodyB = new Body({ mass: 1, position: new Vec3(-1, 0, 0) });
    const c = new LockConstraint(bodyA, bodyB, { maxForce: 123 });

    expect(c.equations.length).toEqual(6);

    expect(c.equations[0].maxForce).toEqual(123);
    expect(c.equations[1].maxForce).toEqual(123);
    expect(c.equations[2].maxForce).toEqual(123);
    expect(c.equations[3].maxForce).toEqual(123);
    expect(c.equations[4].maxForce).toEqual(123);
    expect(c.equations[5].maxForce).toEqual(123);
    expect(c.equations[0].minForce).toEqual(-123);
    expect(c.equations[1].minForce).toEqual(-123);
    expect(c.equations[2].minForce).toEqual(-123);
    expect(c.equations[3].minForce).toEqual(-123);
    expect(c.equations[4].minForce).toEqual(-123);
    expect(c.equations[5].minForce).toEqual(-123);
  });

  it('should update', () => {
    const bodyA = new Body({ mass: 1, position: new Vec3(1, 0, 0) });
    const bodyB = new Body({ mass: 1, position: new Vec3(-1, 0, 0) });
    const c = new LockConstraint(bodyA, bodyB, { maxForce: 123 });
    expect(() => {
      c.update();
    }).not.toThrow();
  });
});
