class Mission < ApplicationRecord
    belongs_to :scientist
    belongs_to :planet

    validates :name, presence: true
    validates :scientist, uniqueness: {scope: :name}
    validates_numericality_of :length_in_days
end
