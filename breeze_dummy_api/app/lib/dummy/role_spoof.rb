module Dummy
    ##
    # Role spoofing helper
    module RoleSpoof
        ## Roles 'Enum'
        module Roles
            REGULAR = 13
            SUPERVISOR = 14
            SUPER_ADMIN = 15
            # Hash of role constants accessible via key
            NAMED = {
                regular: Roles::REGULAR,
                supervisor: Roles::SUPERVISOR,
                super_admin: Roles::SUPER_ADMIN
            }
        end
        ID_ROLES = {
            5001 => :super_admin,
            5003 => :regular
        }

        def resolve(id_or_name, kind = :code)
            if kind == :code
                resolve_code(id_or_name)
            elsif kind == :name
                resolve_name(id_or_name)
            else
                nil
            end
        end

        ##
        # Role name from user id, role name or role id
        def resolve_name(id_or_name)
            if ID_ROLES.keys.include?(id_or_name)
                return Roles::NAMED.keys[Roles::NAMED.values.index(id_or_name)]
            end
            if Roles::NAMED.keys.include?(id_or_name)
                return id_or_name
            end
            if Roles::NAMED.values.include?(id_or_name)
                return Roles::NAMED.keys[Roles::NAMED.values.index(id_or_name)]
            end
            return nil
        end
        
        ##
        # Role code from user id, role name or role id
        def resolve_code(id_or_name)
            if ID_ROLES.keys.include?(id_or_name)
                return Roles::NAMED[ID_ROLES[id_or_name]]
            end
            if Roles::NAMED.keys.include?(id_or_name)
                return Roles::NAMED[id_or_name]
            end
            if Roles::NAMED.values.include?(id_or_name)
                return id_or_name
            end
            return nil
        end
    end
end



