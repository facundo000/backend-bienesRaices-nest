import { SetMetadata } from '@nestjs/common';
import { ValidRoles } from '../interfaces';

export const META_ROLES = 'roles';
export const RoleProtected = (...args: string[]) => {
    
    return SetMetadata(META_ROLES, args);
}
// export const RoleProtected = (...args: ValidRoles[]) => {
//     return SetMetadata(META_ROLES, args.length ? args : null);
// }