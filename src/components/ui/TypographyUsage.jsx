import React from 'react';
import Typography from './Typography';

/**
 * Typography component usage examples for light and dark mode variants
 * This demonstrates the exact specifications provided
 */
const TypographyUsage = () => {
  return (
    <div className="p-6 space-y-6 bg-dashboard-card rounded-xl">
      <div>
        <Typography variant="heading2">
          Typography Component - Light & Dark Mode Variants
        </Typography>
        <Typography variant="body3" className="mt-2">
          Exact specifications with automatic theme switching via CSS variables
        </Typography>
      </div>

      {/* Body Variants */}
      <div className="space-y-4">
        <Typography variant="heading1">
          Body Variants
        </Typography>
        
        <div className="space-y-4 p-4 border border-dashboard-border rounded-lg">
          <div>
            <Typography variant="body1">
              Body1 - Secondary text with 66% opacity (#1C1C1C66 / #FFFFFF66)
            </Typography>
            <Typography variant="body3" className="text-xs mt-1">
              Font: Inter, Weight: 400, Size: 14px, Line-height: 20px, Center aligned
              <br />Light: #1C1C1C66 | Dark: #FFFFFF66
            </Typography>
          </div>
          
          <div>
            <Typography variant="body2">
              Body2 - Tertiary text with 33% opacity (#1C1C1C33 / #FFFFFF33)
            </Typography>
            <Typography variant="body3" className="text-xs mt-1">
              Font: Inter, Weight: 400, Size: 14px, Line-height: 20px, Center aligned
              <br />Light: #1C1C1C33 | Dark: #FFFFFF33
            </Typography>
          </div>
          
          <div>
            <Typography variant="body3">
              Body3 - Primary text with full opacity (#1C1C1C / #FFFFFF)
            </Typography>
            <Typography variant="body3" className="text-xs mt-1">
              Font: Inter, Weight: 400, Size: 14px, Line-height: 20px, Left aligned
              <br />Light: #1C1C1C | Dark: #FFFFFF
            </Typography>
          </div>
          
          <div>
            <Typography variant="body5">
              Body5 - Secondary text with 66% opacity (#1C1C1C66 / #FFFFFF66)
            </Typography>
            <Typography variant="body3" className="text-xs mt-1">
              Font: Inter, Weight: 400, Size: 14px, Line-height: 20px, Left aligned
              <br />Light: #1C1C1C66 | Dark: #FFFFFF66
            </Typography>
          </div>
          
          <div>
            <Typography variant="body6">
              Body6 - Tertiary text with 33% opacity (#1C1C1C33 / #FFFFFF33)
            </Typography>
            <Typography variant="body3" className="text-xs mt-1">
              Font: Inter, Weight: 400, Size: 14px, Line-height: 20px, Left aligned
              <br />Light: #1C1C1C33 | Dark: #FFFFFF33
            </Typography>
          </div>
        </div>
      </div>

      {/* Heading Variants */}
      <div className="space-y-4">
        <Typography variant="heading1">
          Heading Variants
        </Typography>
        
        <div className="space-y-4 p-4 border border-dashboard-border rounded-lg">
          <div>
            <Typography variant="heading1">
              Heading1 - Regular weight (400)
            </Typography>
            <Typography variant="body3" className="text-xs mt-1">
              Font: Inter, Weight: 400, Size: 14px, Line-height: 20px
              <br />Light: #1C1C1C | Dark: #FFFFFF
            </Typography>
          </div>
          
          <div>
            <Typography variant="heading2">
              Heading2 - Semi Bold weight (600)
            </Typography>
            <Typography variant="body3" className="text-xs mt-1">
              Font: Inter, Weight: 600, Size: 14px, Line-height: 20px
              <br />Light: #1C1C1C | Dark: #FFFFFF
            </Typography>
          </div>
        </div>
      </div>

      {/* Usage Examples */}
      <div className="space-y-4">
        <Typography variant="heading1">
          Usage Examples
        </Typography>
        
        <div className="space-y-3 p-4 bg-dashboard-bgSenary rounded-lg">
          <Typography variant="heading2">
            Card Title
          </Typography>
          <Typography variant="body3">
            This is the main content description for the card.
          </Typography>
          <Typography variant="body1">
            Secondary information with reduced opacity.
          </Typography>
          <Typography variant="body2">
            Additional details with even more reduced opacity.
          </Typography>
        </div>
      </div>

      {/* Code Examples */}
      <div className="space-y-4">
        <Typography variant="heading1">
          Code Examples
        </Typography>
        
        <div className="space-y-2 p-4 bg-gray-100 rounded-lg font-mono text-sm">
          <div>{'// Basic usage'}</div>
          <div>&lt;Typography variant="body1"&gt;Text content&lt;/Typography&gt;</div>
          <div>&lt;Typography variant="heading2"&gt;Heading text&lt;/Typography&gt;</div>
          <br />
          <div>{'// Available variants (Light / Dark mode colors):'}</div>
          <div>variant="body1" {'// #1C1C1C66 / #FFFFFF66, center aligned'}</div>
          <div>variant="body2" {'// #1C1C1C33 / #FFFFFF33, center aligned'}</div>
          <div>variant="body3" {'// #1C1C1C / #FFFFFF, left aligned'}</div>
          <div>variant="body5" {'// #1C1C1C66 / #FFFFFF66, left aligned'}</div>
          <div>variant="body6" {'// #1C1C1C33 / #FFFFFF33, left aligned'}</div>
          <div>variant="heading1" {'// #1C1C1C / #FFFFFF, weight 400'}</div>
          <div>variant="heading2" {'// #1C1C1C / #FFFFFF, weight 600'}</div>
          <br />
          <div>{'// Automatic theme switching via CSS variables (--typography-* variables)'}</div>
        </div>
      </div>
    </div>
  );
};

export default TypographyUsage;
