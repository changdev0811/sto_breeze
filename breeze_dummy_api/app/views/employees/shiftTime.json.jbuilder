json.d do
    json.minutes @data.fetch(:minutes, 0)
    json.schedule_id @data.fetch(:schedule_id, 1001)
    json.recording_mode @data.fetch(:recording_mode, 21)
end