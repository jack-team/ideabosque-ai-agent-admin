import type { FC } from 'react';
import { Grid, Icon } from '@shopify/polaris';
import { ArrowRightIcon } from '@shopify/polaris-icons';
import ProCard from '@/components/ProCard';
import styles from './styles.module.less';
import userRoundSvg from '@/assets/svgs/user-round-plus.svg';
import tagSvg from '@/assets/svgs/tag.svg';
import { Link } from 'react-router-dom';
import cartSvg from '@/assets/svgs/shopping-cart.svg';

const FeaturedTemplates: FC = () => {
  return (
    <ProCard title="Featured templates">
      <Grid>
        <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 4, xl: 4 }}>
          <ProCard title="Onboarding customers">
            <div className={styles.item_container}>
              <div className={styles.item_desc}>
                Collects basic information, line name, email, phone, company size as ell as allowing for documents to be uploaded. After the info is collected the agent sets up a meeting via Google or Hubspot calendar integration.
              </div>
              <div className={styles.item_action}>
                <span>Onboarding</span>
                <img src={userRoundSvg} />
              </div>
            </div>
          </ProCard>
        </Grid.Cell>
        <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 4, xl: 4 }}>
          <ProCard title="Sales">
            <div className={styles.item_container}>
              <div className={styles.item_desc}>
                Targeted towards new customers that haven’t purchased any products yet. Offerers a customizable promotional offer to incentivize the user to make their first purchase.
              </div>
              <div className={styles.item_action}>
                <span>Promotion</span>
                <img src={tagSvg} />
              </div>
            </div>
          </ProCard>
        </Grid.Cell>
        <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 4, xl: 4 }}>
          <ProCard title="Sales">
            <div className={styles.item_container}>
              <div className={styles.item_desc}>
                Use this workflow to ask a series of questions to help create a custom order for a customer. This will gather the necessary details to create the quote or send to a team member who can follow up with a custom quote.
              </div>
              <div className={styles.item_action}>
                <span>Orders</span>
                <img src={cartSvg} />
              </div>
            </div>
          </ProCard>
        </Grid.Cell>
      </Grid>
      <div className={styles.footer}>
        <Link to="/">
          See all templates
          {/* @ts-ignore */}
          <Icon source={ArrowRightIcon} />
        </Link>
      </div>
    </ProCard>
  );
}

export default FeaturedTemplates;