class MissionSerializer < ActiveModel::Serializer
  attributes :id, :name, :length_in_days
  has_one :planet
  has_one :scientist
end
