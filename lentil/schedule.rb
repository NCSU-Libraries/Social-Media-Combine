case @environment
when 'production'
  every 15.minutes do
    rake "lentil:image_services:instagram:fetch_by_tag", :output => {:standard => nil}
  end

  every 30.minutes do
    rake "lentil:image_services:test_image_files", :output => {:standard => nil}
  end

  every :hour do
    rake "lentil:image_services:save_image_files", :output => {:standard => nil}
  end

  every 1.day, :at => '4:30 am' do
    rake "lentil:image_services:dump_metadata", :output => {:standard => nil}
  end

  # Wait until we update the donor agreement
  # every '*/10 12-17 * * *' do
  #   rake "lentil:image_services:submit_donor_agreements", :output => {:standard => nil}
  # end
end

# All environments
every :hour do
  rake "lentil:popularity:update_score", :output => {:standard => nil}
end
