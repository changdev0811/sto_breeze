module Fixtures
    module Fyi

        CATS = {
            "Illness"=>{:id=>1001, :color=>"rgb(255,149,149)"},
            "Vacation"=>{:id=>1002, :color=>"rgb(254,203,149)"},
            "Personal"=>{:id=>1003, :color=>"rgb(251,255,157)"},
            "Jury"=>{:id=>1005, :color=>"rgb(119,185,161)"},
            "Bereavement"=>{:id=>1010, :color=>"rgb(45,136,207)"},
            "Training"=>{:id=>1013, :color=>"rgb(121,129,171)"},
            "Holiday"=>{:id=>1024, :color=>"rgb(203,151,180)"}
        }

        def self.build_row(cat)
            r = Random.new
            rm = r.rand
            over = r.rand

            rec = (rm * 15.0).round(2)
            rec *= 2 if (over > 0.7)

            d = {
                "CatID": CATS[cat][:id],
                "CatColor": CATS[cat][:color],
                "CatDesc": cat,
                "CatAbbr": "P",
                "CalType": "Calendar",
                "CatRecorded": "#{rec}",
                "CatAllowed": "15.00",
                "CatRemaining": "#{(15.0-rec).round(2)}",
                "IsAllowed": true
            }

            d
        end

        def self.build_rows
            CATS.keys.map{|k| build_row(k)}
        end
    end
end